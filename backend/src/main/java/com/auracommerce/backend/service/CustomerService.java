package com.auracommerce.backend.service;

import com.auracommerce.backend.model.Customer;
import com.auracommerce.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers(String tier, String search) {
        if (tier != null && !tier.isBlank() && !"all".equalsIgnoreCase(tier)) {
            return customerRepository.findByTierIgnoreCase(tier);
        }
        if (search != null && !search.isBlank()) {
            return customerRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search);
        }
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public Customer createCustomer(Customer customer) {
        customer.setId(null);
        return customerRepository.save(customer);
    }

    public Optional<Customer> updateCustomer(Long id, Customer details) {
        return customerRepository.findById(id).map(existing -> {
            existing.setName(details.getName());
            existing.setEmail(details.getEmail());
            existing.setPhone(details.getPhone());
            existing.setTier(details.getTier());
            existing.setStatus(details.getStatus());
            return customerRepository.save(existing);
        });
    }

    public boolean deleteCustomer(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
