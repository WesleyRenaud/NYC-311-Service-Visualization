import React from 'react';

interface Props {
   complaintType: string;
   setComplaintType: (v: string) => void;
   startTime: string;
   setStartTime: (v: string) => void;
   endTime: string;
   setEndTime: (v: string) => void;
   onGo: () => void;
}

export default function FilterBar({
   complaintType,
   setComplaintType,
   startTime,
   setStartTime,
   endTime,
   setEndTime,
   onGo
}: Props) {
   return (
      <div>
         <div id="header">
         <h2>Team <span id="teamName">Saffron</span>: Urban Service Demand & Responsiveness (NYC 311)</h2>
         <div className="container">
            <div id="dropdown">
               <label><b>Complaint Type:</b>
               <select value={complaintType} onChange={(e) => setComplaintType(e.target.value)}>
                  {/* Kepep all <option> elements */}
                  <option value="All">All</option>
                  <option value="Abandoned Bike">Abandoned Bike</option>
                  <option value="Abandoned Vehicle">Abandoned Vehicle</option>
                  <option value="Air Quality">Air Quality</option>
                  <option value="Animal in a Park">Animal in a Park</option>
                  <option value="Animal-Abuse">Animal-Abuse</option>
                  <option value="APPLIANCE">APPLIANCE</option>
                  <option value="Bike Rack">Bike Rack</option>
                  <option value="Blocked Driveway">Blocked Driveway</option>
                  <option value="Building/Use">Building/Use</option>
                  <option value="Bus Stop Shelter Complaint">Bus Stop Shelter Complaint</option>
                  <option value="Cannabis Retailer">Cannabis Retailer</option>
                  <option value="Commercial Disposal Complaint">Commercial Disposal Complaint</option>
                  <option value="Consumer Complaint">Consumer Complaint</option>
                  <option value="Curb Condition">Curb Condition</option>
                  <option value="Damaged Tree">Damaged Tree</option>
                  <option value="Dead Animal">Dead Animal</option>
                  <option value="Dead/Dying Tree">Dead/Dying Tree</option>
                  <option value="Derelict Vehicles">Derelict Vehicles</option>
                  <option value="Dirty Condition">Dirty Condition</option>
                  <option value="Disorderly Youth">Disorderly Youth</option>
                  <option value="DOOR/WINDOW">DOOR/WINDOW</option>
                  <option value="Drinking">Drinking</option>
                  <option value="Drug Activity">Drug Activity</option>
                  <option value="Dumpster Complaint">Dumpster Complaint</option>
                  <option value="ELECTRIC">ELECTRIC</option>
                  <option value="ELEVATOR">ELEVATOR</option>
                  <option value="Emergency Response Team (ERT)">Emergency Response Team (ERT)</option>
                  <option value="Encampment">Encampment</option>
                  <option value="FLOORING/STAIRS">FLOORING/STAIRS</option>
                  <option value="Food Establishment">Food Establishment</option>
                  <option value="Food Poisoning">Food Poisoning</option>
                  <option value="For Hire Vehicle Complaint">For Hire Vehicle Complaint</option>
                  <option value="GENERAL">GENERAL</option>
                  <option value="Graffiti">Graffiti</option>
                  <option value="Green Taxi Complaint">Green Taxi Complaint</option>
                  <option value="HEAT/HOT WATER">HEAT/HOT WATER</option>
                  <option value="Highway Condition">Highway Condition</option>
                  <option value="Homeless Person Assistance">Homeless Person Assistance</option>
                  <option value="Illegal Dumping">Illegal Dumping</option>
                  <option value="Illegal Fireworks">Illegal Fireworks</option>
                  <option value="Illegal Parking">Illegal Parking</option>
                  <option value="Illegal Posting">Illegal Posting</option>
                  <option value="Illegal Tree Damage">Illegal Tree Damage</option>
                  <option value="Indoor Air Quality">Indoor Air Quality</option>
                  <option value="Industrial Waste">Industrial Waste</option>
                  <option value="Lead">Lead</option>
                  <option value="Litter Basket Request">Litter Basket Request</option>
                  <option value="Lost Property">Lost Property</option>
                  <option value="Lot Condition">Lot Condition</option>
                  <option value="Maintenance or Facility">Maintenance or Facility</option>
                  <option value="Missed Collection">Missed Collection</option>
                  <option value="Mobile Food Vendor">Mobile Food Vendor</option>
                  <option value="New Tree Request">New Tree Request</option>
                  <option value="Noise">Noise</option>
                  <option value="Noise - Commercial">Noise - Commercial</option>
                  <option value="Noise - Helicopter">Noise - Helicopter</option>
                  <option value="Noise - Park">Noise - Park</option>
                  <option value="Noise - Residential">Noise - Residential</option>
                  <option value="Noise - Street/Sidewalk">Noise - Street/Sidewalk</option>
                  <option value="Noise - Vehicle">Noise - Vehicle</option>
                  <option value="Non-Emergency Police Matter">Non-Emergency Police Matter</option>
                  <option value="Obstruction">Obstruction</option>
                  <option value="Outdoor Dining">Outdoor Dining</option>
                  <option value="PAINT/PLASTER">PAINT/PLASTER</option>
                  <option value="Panhandling">Panhandling</option>
                  <option value="PLUMBING">PLUMBING</option>
                  <option value="Residential Disposal Complaint">Residential Disposal Complaint</option>
                  <option value="Rodent">Rodent</option>
                  <option value="Root/Sewer/Sidewalk Condition">Root/Sewer/Sidewalk Condition</option>
                  <option value="SAFETY">SAFETY</option>
                  <option value="School Maintenance">School Maintenance</option>
                  <option value="Sewer">Sewer</option>
                  <option value="Sidewalk Condition">Sidewalk Condition</option>
                  <option value="Smoking or Vaping">Smoking or Vaping</option>
                  <option value="Street Condition">Street Condition</option>
                  <option value="Street Light Condition">Street Light Condition</option>
                  <option value="Street Sign - Dangling">Street Sign - Dangling</option>
                  <option value="Taxi Complaint">Taxi Complaint</option>
                  <option value="Taxi Report">Taxi Report</option>
                  <option value="Traffic">Traffic</option>
                  <option value="Traffic Signal Condition">Traffic Signal Condition</option>
                  <option value="Unleashed Dog">Unleashed Dog</option>
                  <option value="Unsanitary Animal Pvt Property">Unsanitary Animal Pvt Property</option>
                  <option value="UNSANITARY CONDITION">UNSANITARY CONDITION</option>
                  <option value="Urinating in Public">Urinating in Public</option>
                  <option value="Vendor Enforcement">Vendor Enforcement</option>
                  <option value="Violation of Park Rules">Violation of Park Rules</option>
                  <option value="WATER LEAK">WATER LEAK</option>
                  <option value="Water System">Water System</option>
               </select>
               </label>
            </div>

            <div className="filters">
               <label>
               <b>Occurred between:</b>
               <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
               />
               </label>
               <label>
               <b>to</b>
               <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
               />
               </label>
            </div>

            <button id="go-button" onClick={onGo}><b>Go</b></button>
         </div>
         </div>
      </div>
   );
}