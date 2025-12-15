package com.example.cis4900.spring.template.incidents;

import java.time.LocalDateTime;

public class IncidentFilter {
   private String complaintType;
   private LocalDateTime start;
   private LocalDateTime end;

   public IncidentFilter(String complaintType, LocalDateTime start, LocalDateTime end) {
      this.complaintType = complaintType;
      this.start = start;
      this.end = end;
   }

   public String getComplaintType() {
      return complaintType;
   }

   public LocalDateTime getStart() {
      return start;
   }

   public LocalDateTime getEnd() {
      return end;
   }
}
