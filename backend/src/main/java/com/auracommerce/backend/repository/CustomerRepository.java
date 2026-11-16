package com.auracommerce.backend.repository;

import com.auracommerce.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByTierIgnoreCase(String tier);
    List<Customer> findByStatusIgnoreCase(String status);
    List<Customer> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
    long countByStatusIgnoreCase(String status);
    long countByTierIgnoreCase(String tier);
}
