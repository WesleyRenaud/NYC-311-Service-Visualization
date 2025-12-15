package com.example.cis4900.spring.template.incidents.dao;

import com.example.cis4900.spring.template.incidents.models.Incident;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.time.LocalDateTime;

public interface IncidentsDao extends JpaRepository<Incident, String>, JpaSpecificationExecutor<Incident> {

    @Query("SELECT COUNT(*) FROM Incident i")
    Integer getCount();

    // Example methods for filtering (you can add more as needed)
    Page<Incident> findByComplaintType(String complaintType, Pageable pageable);
    Page<Incident> findByCreatedDateBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<Incident> findByCreatedDateAfter(LocalDateTime start, Pageable pageable);
    Page<Incident> findByCreatedDateBefore(LocalDateTime end, Pageable pageable);
    Page<Incident> findByComplaintTypeAndCreatedDateBetween(String complaintType, LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<Incident> findByComplaintTypeAndCreatedDateAfter(String complaintType, LocalDateTime start, Pageable pageable);
    Page<Incident> findByComplaintTypeAndCreatedDateBefore(String complaintType, LocalDateTime end, Pageable pageable);
}
