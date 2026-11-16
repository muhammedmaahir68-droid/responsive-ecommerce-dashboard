package com.auracommerce.backend.controller;

import com.auracommerce.backend.model.DashboardStats;
import com.auracommerce.backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }

    @GetMapping("/chart")
    public ResponseEntity<DashboardStats.ChartData> getChartData(
            @RequestParam(defaultValue = "7D") String range) {
        return ResponseEntity.ok(dashboardService.getChartData(range));
    }
}
