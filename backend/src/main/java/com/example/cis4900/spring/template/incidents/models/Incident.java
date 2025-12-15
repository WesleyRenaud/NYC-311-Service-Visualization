package com.example.cis4900.spring.template.incidents.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidentdb")
public class Incident {
    @Id
    @Column(name = "unique_key", length = 255)
    private String uniqueKey;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "closed_date")
    private LocalDateTime closeDate;

    @Column(name = "agency", length = 255)
    private String agency;

    @Column(name = "agency_name", length = 255)
    private String agencyName;

    @Column(name = "complaint_type", length = 255)
    private String complaintType;

    @Column(name = "descriptor", length = 255)
    private String descriptor;

    @Column(name = "location_type", length = 255)
    private String locationType;

    @Column(name = "incident_zip", length = 255)
    private String incidentZip;

    @Column(name = "incident_address", length = 255)
    private String incidentAddress;

    @Column(name = "street_name", length = 255)
    private String streetName;

    @Column(name = "cross_street_1", length = 255)
    private String crossStreet1;

    @Column(name = "cross_street_2", length = 255)
    private String crossStreet2;

    @Column(name = "intersection_street_1", length = 255)
    private String intersectionStreet1;

    @Column(name = "intersection_street_2", length = 255)
    private String intersectionStreet2;

    @Column(name = "address_type", length = 255)
    private String addressType;

    @Column(name = "city", length = 255)
    private String city;

    @Column(name = "landmark", length = 255)
    private String landmark;

    @Column(name = "facility_type", length = 255)
    private String facilityType;

    @Column(name = "status", length = 255)
    private String status;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "resolution_description", length = 255)
    private String resolutionDescription;

    @Column(name = "resolution_action_updated_date")
    private LocalDateTime resolutionActionUpdatedDate;

    @Column(name = "community_board", length = 255)
    private String communityBoard;

    @Column(name = "borough", length = 255)
    private String borough;

    @Column(name = "x_coordinate_state_plane")
    private Float xCoordinateStatePlane;

    @Column(name = "y_coordinate_state_plane")
    private Float yCoordinateStatePlane;

    @Column(name = "open_data_channel_type", length = 255)
    private String openDataChannelType;

    @Column(name = "park_facility_name", length = 255)
    private String parkFacilityName;

    @Column(name = "park_borough", length = 255)
    private String parkBorough;

    @Column(name = "vehicle_type", length = 255)
    private String vehicleType;

    @Column(name = "taxi_company_borough", length = 255)
    private String taxiCompanyBorough;

    @Column(name = "taxi_pick_up_location", length = 255)
    private String taxiPickUpLocation;

    @Column(name = "bridge_highway_name", length = 255)
    private String bridgeHighwayName;

    @Column(name = "bridge_highway_direction", length = 255)
    private String bridgeHighwayDirection;

    @Column(name = "road_ramp", length = 255)
    private String roadRamp;

    @Column(name = "bridge_highway_segment", length = 255)
    private String bridgeHighwaySegment;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "location", length = 255)
    private String location;

    public Incident() {

    }

    public String getUniqueKey() {
        return uniqueKey;
    }

    public void setUniqueKey(String uniqueKey) {
        this.uniqueKey = uniqueKey;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(LocalDateTime closeDate) {
        this.closeDate = closeDate;
    }

    public String getAgency() {
        return agency;
    }

    public void setAgency(String agency) {
        this.agency = agency;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }

    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }

    public String getDescriptor() {
        return descriptor;
    }

    public void setDescriptor(String descriptor) {
        this.descriptor = descriptor;
    }

    public String getLocationType() {
        return locationType;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public String getIncidentZip() {
        return incidentZip;
    }

    public void setIncidentZip(String incidentZip) {
        this.incidentZip = incidentZip;
    }

    public String getIncidentAddress() {
        return incidentAddress;
    }

    public void setIncidentAddress(String incidentAddress) {
        this.incidentAddress = incidentAddress;
    }

    public String streetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String crossStreet1() {
        return crossStreet1;
    }

    public void setCrossStreet1(String crossStreet1) {
        this.crossStreet1 = crossStreet1;
    }

    public String crossStreet2() {
        return crossStreet2;
    }

    public void setCrossStreet2(String crossStreet2) {
        this.crossStreet2 = crossStreet2;
    }

    public String intersectionStreet1() {
        return intersectionStreet1;
    }

    public void setIntersectionStreet1(String intersectionStreet1) {
        this.intersectionStreet1 = intersectionStreet1;
    }

    public String intersectionStreet2() {
        return intersectionStreet2;
    }

    public void setIntersectionStreet2(String intersectionStreet2) {
        this.intersectionStreet2 = intersectionStreet2;
    }

    public String getAddressType() {
        return addressType;
    }

    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getFacilityType() {
        return facilityType;
    }

    public void setFacilityType(String facilityType) {
        this.facilityType = facilityType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getResolutionDescription() {
        return resolutionDescription;
    }

    public void setResolutionDescription(String resolutionDescription) {
        this.resolutionDescription = resolutionDescription;
    }

    public LocalDateTime getResolutionActionUpdatedDate() {
        return resolutionActionUpdatedDate;
    }

    public void setResolutionActionUpdatedDate(LocalDateTime resolutionActionUpdatedDate) {
        this.resolutionActionUpdatedDate = resolutionActionUpdatedDate;
    }

    public String getCommunityBoard() {
        return communityBoard;
    }

    public void setCommunityBoard(String communityBoard) {
        this.communityBoard = communityBoard;
    }

    public String getBorough() {
        return borough;
    }

    public void setBorough(String borough) {
        this.borough = borough;
    }

    public Float getXCoordinateStatePlane() {
        return xCoordinateStatePlane;
    }

    public void setXCoordinateStatePlane(Float xCoordinateStatePlane) {
        this.xCoordinateStatePlane = xCoordinateStatePlane;
    }

    public Float getYCoordinateStatePlane() {
        return yCoordinateStatePlane;
    }

    public void setYCoordinateStatePlane(Float yCoordinateStatePlane) {
        this.yCoordinateStatePlane = yCoordinateStatePlane;
    }

    public String getOpenDataChannelType() {
        return openDataChannelType;
    }

    public void setOpenDataChannelType(String openDataChannelType) {
        this.openDataChannelType = openDataChannelType;
    }

    public String getParkFacilityName() {
        return parkFacilityName;
    }

    public void setParkFacilityName(String parkFacilityName) {
        this.parkFacilityName = parkFacilityName;
    }

    public String getParkBorough() {
        return parkBorough;
    }

    public void setParkBorough(String parkBorough) {
        this.parkBorough = parkBorough;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getTaxiCompanyBorough() {
        return taxiCompanyBorough;
    }

    public void setTaxiCompanyBorough(String taxiCompanyBorough) {
        this.taxiCompanyBorough = taxiCompanyBorough;
    }

    public String getTaxiPickUpLocation() {
        return taxiPickUpLocation;
    }

    public void setTaxiPickUpLocation(String taxiPickUpLocation) {
        this.taxiPickUpLocation = taxiPickUpLocation;
    }

    public String getBridgeHighwayName() {
        return bridgeHighwayName;
    }

    public void setBridgeHighwayName(String bridgeHighwayName) {
        this.bridgeHighwayName = bridgeHighwayName;
    }

    public String getBridgeHighwayDirection() {
        return bridgeHighwayDirection;
    }

    public void setBridgeHighwayDirection(String bridgeHighwayDirection) {
        this.bridgeHighwayDirection = bridgeHighwayDirection;
    }

    public String getRoadRamp() {
        return roadRamp;
    }

    public void setRoadRamp(String roadRamp) {
        this.roadRamp = roadRamp;
    }

    public String getBridgeHighwaySegment() {
        return bridgeHighwaySegment;
    }

    public void setBridgeHighwaySegment(String bridgeHighwaySegment) {
        this.bridgeHighwaySegment = bridgeHighwaySegment;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }
    
    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
}