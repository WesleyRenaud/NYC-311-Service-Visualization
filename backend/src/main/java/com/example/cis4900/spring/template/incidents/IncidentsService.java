package com.example.cis4900.spring.template.incidents;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.cis4900.spring.template.incidents.models.Incident;

public interface IncidentsService {
    public String addIncident(Incident newIncident);

    public Incident getIncident(String id);

    public String updateIncident(Incident updatedIncident);

    public String deleteIncident(String id);

    public Iterable<Incident> allIncidents();

    public Integer count();

    Page<Incident> getFilteredIncidents(String complaintType, LocalDateTime start, LocalDateTime end, Pageable pageable);
}