package com.example.cis4900.spring.template.incidents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.cis4900.spring.template.incidents.dao.IncidentsDao;
import com.example.cis4900.spring.template.incidents.models.Incident;

import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class IncidentsServiceImpl implements IncidentsService {
    @Autowired
    private IncidentsDao incidentsDao;

    @Override
    public String addIncident(Incident newIncident) {
        try {
            incidentsDao.save(newIncident);
        } catch (Exception exception) {
            return exception.getMessage();
        }
        return "{\"message\": \"Saved\"}";
    }

    @Override
    public Incident getIncident(String id) {
        return incidentsDao.findById(id).orElse(null);
    }

    @Override
    public String updateIncident(Incident updatedIncident) {
        try {
            incidentsDao.save(updatedIncident);
        } catch (Exception exception) {
            return exception.getMessage();
        }
        return "{\"message\": \"Updated\"}";
    }

    @Override
    public String deleteIncident(String id) {
        try {
            incidentsDao.deleteById(id);
        } catch (Exception exception) {
            return exception.getMessage();
        }
        return "{\"message\": \"Deleted\"}";
    }

    @Override
    public Iterable<Incident> allIncidents() {
        return incidentsDao.findAll();
    }

    @Override
    public Integer count() {
        return incidentsDao.getCount();
    }

    public Page<Incident> getFilteredIncidents(
        String complaintType,
        LocalDateTime start,
        LocalDateTime end,
        Pageable pageable
    ) {
        Specification<Incident> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (complaintType != null && !complaintType.isEmpty()) {
                predicates.add(cb.equal(root.get("complaintType"), complaintType));
            }
            if (start != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdDate"), start));
            }
            if (end != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("createdDate"), end));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return incidentsDao.findAll(spec, pageable);
    }
}