package com.auracommerce.backend.repository;

import com.auracommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findByTitleContainingIgnoreCaseOrSkuContainingIgnoreCase(String title, String sku);
    List<Product> findByStatusIgnoreCase(String status);
}
