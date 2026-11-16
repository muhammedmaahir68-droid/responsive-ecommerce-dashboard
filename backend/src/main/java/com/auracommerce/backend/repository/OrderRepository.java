package com.auracommerce.backend.repository;

import com.auracommerce.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatusIgnoreCase(String status);

    List<Order> findByOrderNumberContainingIgnoreCaseOrCustomerNameContainingIgnoreCase(String orderNumber, String customerName);

    long countByStatusIgnoreCase(String status);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0.0) FROM Order o WHERE LOWER(o.status) <> 'cancelled'")
    Double calculateTotalRevenue();
}
