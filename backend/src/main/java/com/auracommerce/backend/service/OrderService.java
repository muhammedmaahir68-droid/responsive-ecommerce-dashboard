package com.auracommerce.backend.service;

import com.auracommerce.backend.model.Order;
import com.auracommerce.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders(String status, String search) {
        if (status != null && !status.isBlank() && !"all".equalsIgnoreCase(status)) {
            return orderRepository.findByStatusIgnoreCase(status);
        }
        if (search != null && !search.isBlank()) {
            return orderRepository.findByOrderNumberContainingIgnoreCaseOrCustomerNameContainingIgnoreCase(search, search);
        }
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        if (order.getOrderNumber() == null || order.getOrderNumber().isBlank()) {
            order.setOrderNumber("ORD-" + (1000 + (long)(Math.random() * 9000)));
        }
        if (order.getOrderDate() == null) {
            order.setOrderDate(LocalDate.now());
        }
        return orderRepository.save(order);
    }

    public Optional<Order> updateOrderStatus(Long id, String status) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            return orderRepository.save(order);
        });
    }

    public boolean deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
