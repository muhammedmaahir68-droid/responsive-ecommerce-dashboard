package com.auracommerce.backend.model;

import java.util.List;
import java.util.Map;

public class DashboardStats {

    private Double totalRevenue;
    private Double revenueGrowth;
    private Long totalOrders;
    private Double ordersGrowth;
    private Double conversionRate;
    private Long activeCustomers;
    private Double customersGrowth;
    private Long totalProducts;
    private Long pendingOrders;

    private Map<String, ChartData> charts;

    public static class ChartData {
        private List<String> labels;
        private List<Double> values;

        public ChartData() {}

        public ChartData(List<String> labels, List<Double> values) {
            this.labels = labels;
            this.values = values;
        }

        public List<String> getLabels() {
            return labels;
        }

        public void setLabels(List<String> labels) {
            this.labels = labels;
        }

        public List<Double> getValues() {
            return values;
        }

        public void setValues(List<Double> values) {
            this.values = values;
        }
    }

    public DashboardStats() {}

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Double getRevenueGrowth() {
        return revenueGrowth;
    }

    public void setRevenueGrowth(Double revenueGrowth) {
        this.revenueGrowth = revenueGrowth;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Double getOrdersGrowth() {
        return ordersGrowth;
    }

    public void setOrdersGrowth(Double ordersGrowth) {
        this.ordersGrowth = ordersGrowth;
    }

    public Double getConversionRate() {
        return conversionRate;
    }

    public void setConversionRate(Double conversionRate) {
        this.conversionRate = conversionRate;
    }

    public Long getActiveCustomers() {
        return activeCustomers;
    }

    public void setActiveCustomers(Long activeCustomers) {
        this.activeCustomers = activeCustomers;
    }

    public Double getCustomersGrowth() {
        return customersGrowth;
    }

    public void setCustomersGrowth(Double customersGrowth) {
        this.customersGrowth = customersGrowth;
    }

    public Long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(Long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public Long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(Long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public Map<String, ChartData> getCharts() {
        return charts;
    }

    public void setCharts(Map<String, ChartData> charts) {
        this.charts = charts;
    }
}
