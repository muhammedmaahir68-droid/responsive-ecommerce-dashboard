package com.auracommerce.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Customer name is required")
    @Column(nullable = false)
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    private String tier; // "VIP", "Regular"

    private Double totalSpent;

    private Integer totalOrders;

    private String status; // "Active", "Inactive"

    private LocalDate joinDate;

    public Customer() {
        this.joinDate = LocalDate.now();
        this.status = "Active";
        this.tier = "Regular";
        this.totalSpent = 0.0;
        this.totalOrders = 0;
    }

    public Customer(String name, String email, String phone, String tier, Double totalSpent, Integer totalOrders, String status, LocalDate joinDate) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.tier = tier != null ? tier : "Regular";
        this.totalSpent = totalSpent != null ? totalSpent : 0.0;
        this.totalOrders = totalOrders != null ? totalOrders : 0;
        this.status = status != null ? status : "Active";
        this.joinDate = joinDate != null ? joinDate : LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTier() {
        return tier;
    }

    public void setTier(String tier) {
        this.tier = tier;
    }

    public Double getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(Double totalSpent) {
        this.totalSpent = totalSpent;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }
}
