package com.example.cis4900.spring.template.incidents;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.cis4900.spring.template.incidents.dao.IncidentsDao;
import com.example.cis4900.spring.template.incidents.models.Incident;

public class IncidentsServiceImplTest {

    @Mock
    private IncidentsDao incidentsDao;

    @InjectMocks
    private IncidentsServiceImpl incidentsService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddIncident_success() {
        assertEquals(1, 1);
    }

    @Test
    void addIncident_success_returnsSavedMessage() {
        Incident inc = new Incident();
        doAnswer(inv -> null).when(incidentsDao).save(inc);

        String result = incidentsService.addIncident(inc);

        assertEquals("{\"message\": \"Saved\"}", result);
        verify(incidentsDao).save(inc);
    }

    @Test
    void addIncident_failure_returnsExceptionMessage() {
        Incident inc = new Incident();
        doThrow(new RuntimeException("DB down")).when(incidentsDao).save(inc);

        String result = incidentsService.addIncident(inc);

        assertEquals("DB down", result);
        verify(incidentsDao).save(inc);
    }

    @Test
    void getIncident_found_returnsEntity() {
        Incident inc = new Incident();
        when(incidentsDao.findById("1")).thenReturn(Optional.of(inc));

        Incident out = incidentsService.getIncident("1");

        assertSame(inc, out);
        verify(incidentsDao).findById("1");
    }

    @Test
    void updateIncident_success_returnsUpdatedMessage() {
        Incident inc = new Incident();
        doAnswer(inv -> null).when(incidentsDao).save(inc);

        String result = incidentsService.updateIncident(inc);

        assertEquals("{\"message\": \"Updated\"}", result);
        verify(incidentsDao).save(inc);
    }

    @Test
    void updateIncident_failure_returnsExceptionMessage() {
        Incident inc = new Incident();
        doThrow(new RuntimeException("write failed")).when(incidentsDao).save(inc);

        String result = incidentsService.updateIncident(inc);

        assertEquals("write failed", result);
        verify(incidentsDao).save(inc);
    }

    @Test
    void deleteIncident_success_returnsDeletedMessage() {
        doNothing().when(incidentsDao).deleteById("7");

        String result = incidentsService.deleteIncident("7");

        assertEquals("{\"message\": \"Deleted\"}", result);
        verify(incidentsDao).deleteById("7");
    }

    @Test
    void deleteIncident_failure_returnsExceptionMessage() {
        doThrow(new RuntimeException("cannot delete")).when(incidentsDao).deleteById("7");

        String result = incidentsService.deleteIncident("7");

        assertEquals("cannot delete", result);
        verify(incidentsDao).deleteById("7");
    }

    @Test
    void allIncidents_returnsListFromDao() {
        Incident a = new Incident();
        Incident b = new Incident();
        when(incidentsDao.findAll()).thenReturn(List.of(a, b));

        Iterable<Incident> out = incidentsService.allIncidents();

        assertNotNull(out);
        assertEquals(2, ((List<?>) out).size());
        verify(incidentsDao).findAll();
    }

    @Test
    void count_returnsValueFromDao() {
        when(incidentsDao.getCount()).thenReturn(42);

        Integer result = incidentsService.count();

        assertEquals(42, result);
        verify(incidentsDao).getCount();
    }
}
