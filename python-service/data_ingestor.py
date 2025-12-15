import os
import logging
import pandas as pd
import requests
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
from datetime import datetime, timedelta
import pymysql
import time

# Load environment variables from .env file
load_dotenv()

pymysql.install_as_MySQLdb()

# Configure logging
logging.basicConfig(
   level=logging.INFO,
   format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

# Database configuration
DB_URL = os.getenv( "DB_URL" )
TABLE_NAME = os.getenv( "TABLE_NAME", "imported_data" )

# NYC Open Data API endpoint
API_ENDPOINT = "https://data.cityofnewyork.us/resource/erm2-nwe9.json"


def flatten_dict_columns( df ):
   for col in df.columns:
      if df[col].apply( lambda x: isinstance( x, dict ) ).any():
         df[col] = df[col].apply( lambda x: str( x ) if isinstance( x, dict ) else x )
      if df[col].apply( lambda x: isinstance( x, list ) ).any():
         df[col] = df[col].apply( lambda x: str( x ) if isinstance( x, list ) else x )
   return df


def fetch_recent_311_data( days=60, limit=5000 ):
   """Fetch recent 311 data from NYC Open Data."""
   start_date = (datetime.today() - timedelta( days=days )).strftime( "%Y-%m-%dT%H:%M:%S" )
   params = {
      "$where": f"created_date >= '{start_date}'",
      "$limit": limit,
      "$order": "created_date DESC"
   }

   logger.info( f"Fetching 311 data since {start_date}" )
   response = requests.get( API_ENDPOINT, params=params )
   response.raise_for_status()
   data = response.json()
   df = pd.DataFrame( data )
   logger.info( f"Fetched {len( df )} records" )
   return df


def load_data( df ):
   """Load DataFrame into SQL database."""
   try:
      engine = create_engine( DB_URL )
      df.to_sql( TABLE_NAME, con=engine, if_exists="append", index=False )
      logger.info( "Data loaded successfully" )
   except SQLAlchemyError as e:
      logger.error( f"Database error: {e}" )
      raise


def run_ingestor():
   """ETL pipeline."""
   try:
      df = fetch_recent_311_data()
      if not df.empty:
         df = flatten_dict_columns( df )
         load_data( df )
      else:
         logger.info( "No new records to load" )
   except Exception as e:
      logger.error( f"ETL pipeline failed: {e}" )


def wait_for_database( host, user, password, database, interval=2 ):
    while True:
        try:
            conn = pymysql.connect(
               host=host,
               user=user,
               password=password,
               database=database
            )
            conn.close()
            print( "Database ready!" )
            break
        except pymysql.err.OperationalError:
            print( "Waiting for database..." )
            time.sleep( interval )


if __name__ == "__main__":
    wait_for_database(
       host="database",
       user="root",
       password="pwd",
       database="nyc_311"
    )

    run_ingestor()
