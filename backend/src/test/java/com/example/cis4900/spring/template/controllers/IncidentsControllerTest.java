package com.example.cis4900.spring.template.controllers;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import com.example.cis4900.spring.template.incidents.IncidentsService;
import com.example.cis4900.spring.template.incidents.models.Incident;

import java.time.LocalDateTime;

@WebMvcTest(IncidentsController.class)
public class IncidentsControllerTest {
   
   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private IncidentsService incidentsService;

   /* incident for testing purposes */
   private Incident sampleIncident() {
      Incident inc = new Incident();
      inc.setUniqueKey("1");
      inc.setAgency("NYPD");
      inc.setAgencyName("New York Police Department");
      inc.setComplaintType("Noise - Street/Sidewalk");
      inc.setDescriptor("Loud Talking");
      inc.setLocationType("Street");
      inc.setIncidentZip("10001");
      inc.setIncidentAddress("123 Main St");
      inc.setStreetName("MAIN ST");
      inc.setCity("New York");
      inc.setStatus("Open");
      inc.setCreatedDate(LocalDateTime.of(2025, 10, 26, 14, 30, 0));
      inc.setDueDate(LocalDateTime.of(2025, 10, 30, 23, 59, 0));
      inc.setLatitude(40.7500f);
      inc.setLongitude(-73.9970f);
      return inc;
   }

   @Test
   void testGetIncident() throws Exception {
      Incident mockIncident = sampleIncident();
      when(incidentsService.getIncident("1")).thenReturn(mockIncident);

      mockMvc.perform(get("/api/incidents/get/1"))
         .andExpect(status().isOk())
         .andExpect(jsonPath("$.uniqueKey").value("1"))
         .andExpect(jsonPath("$.agency").value("NYPD"))
         .andExpect(jsonPath("$.status").value("Open"))
         .andExpect(jsonPath("$.createdDate").value("2025-10-26T14:30:00"))
         .andExpect(jsonPath("$.latitude").value(40.75))
         .andExpect(jsonPath("$.longitude").value(-73.997));

      verify(incidentsService).getIncident("1");
   }

   @Test
   void testAddIncident() throws Exception {
      when(incidentsService.addIncident(Mockito.any(Incident.class))).thenReturn("Added");

      String json = """
      {
         "uniqueKey": "1",
         "agency": "NYPD",
         "status": "Open",
         "createdDate": "2025-10-26T14:30:00",
         "latitude": 40.75,
         "longitude": -73.997
      }
      """;

      mockMvc.perform(post("/api/incidents/add")
         .contentType(MediaType.APPLICATION_JSON)
         .content(json))
         .andExpect(status().isOk())
         .andExpect(content().string("Added"));

      verify(incidentsService).addIncident(Mockito.any(Incident.class));
   }

   @Test
   void testUpdateIncident() throws Exception {
      when(incidentsService.updateIncident(Mockito.any(Incident.class))).thenReturn("Updated");

      String json = """
      {
         "uniqueKey": "1",
         "agency": "NYPD",
         "status": "Closed",
         "closeDate": "2025-10-27T08:00:00"
      }
      """;

      mockMvc.perform(put("/api/incidents/update")
         .contentType(MediaType.APPLICATION_JSON)
         .content(json))
         .andExpect(status().isOk())
         .andExpect(content().string("Updated"));

      verify(incidentsService).updateIncident(Mockito.any(Incident.class));
   }

   @Test
   void testDeleteIncident() throws Exception {
      when(incidentsService.deleteIncident("1")).thenReturn("Deleted");

      mockMvc.perform(delete("/api/incidents/delete/1"))
         .andExpect(status().isOk())
         .andExpect(content().string("Deleted"));

      verify(incidentsService).deleteIncident("1");
   }
}
