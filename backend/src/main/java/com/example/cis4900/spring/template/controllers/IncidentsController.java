package com.example.cis4900.spring.template.controllers;

import com.example.cis4900.spring.template.incidents.IncidentsService;
import com.example.cis4900.spring.template.incidents.models.Incident;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;


@RestController
@RequestMapping(path = "/api/incidents")
public class IncidentsController {
    private IncidentsService incidentsService;

    @Autowired
    IncidentsController(IncidentsService incidentsService) {
        this.incidentsService = incidentsService;
    }

    @PostMapping("/add")
    private @ResponseBody String addIncident(@RequestBody Incident newIncident) {
        return incidentsService.addIncident(newIncident);
    }

    @GetMapping("/get/{id}")
    private @ResponseBody Incident getIncident(@PathVariable String id) {
        return incidentsService.getIncident(id);
    }

    @PutMapping("/update")
    private @ResponseBody String updateIncident(@RequestBody Incident updatedIncident) {
        return incidentsService.updateIncident(updatedIncident);
    }

    @DeleteMapping("/delete/{id}")
    private @ResponseBody String deleteIncident(@PathVariable String id) {
        return incidentsService.deleteIncident(id);
    }

    @PutMapping("/resolve/{id}")
    private @ResponseBody String resolveIncident(@PathVariable String id) {
        Incident incident = incidentsService.getIncident(id);
        if (incident == null) {
            // keep it simple – you can make this a proper 404 later if you want
            return "{\"message\": \"Not found\"}";
        }

        LocalDateTime now = LocalDateTime.now();

        incident.setStatus("Closed");
        incident.setCloseDate(now);
        incident.setResolutionActionUpdatedDate(now);

        if (incident.getResolutionDescription() == null
            || incident.getResolutionDescription().isBlank()) {
            incident.setResolutionDescription("Marked as resolved in map UI");
        }

        return incidentsService.updateIncident(incident);
    }

    @GetMapping("/all")
    private @ResponseBody Iterable<Incident> allIncidents() {
        return incidentsService.allIncidents();
    }

    @GetMapping("/count")
    private @ResponseBody Integer count() {
        return incidentsService.count();
    }

    @GetMapping("/filtered")
    private @ResponseBody Page<Incident> getFilteredIncidents(
            @RequestParam(required = false) String complaintType,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5000") int size
    ) {
        LocalDateTime startTime = (start != null && !start.isEmpty())
                ? LocalDateTime.parse(start)
                : null;

        LocalDateTime endTime = (end != null && !end.isEmpty())
                ? LocalDateTime.parse(end)
                : null;

        Pageable pageable = PageRequest.of(page, size);

        return incidentsService.getFilteredIncidents(
            complaintType,
            startTime,
            endTime,
            pageable
        );
    }
}
