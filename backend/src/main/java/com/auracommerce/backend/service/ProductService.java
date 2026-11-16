package com.auracommerce.backend.service;

import com.auracommerce.backend.model.Product;
import com.auracommerce.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(String category, String search) {
        if (category != null && !category.isBlank() && !"all".equalsIgnoreCase(category)) {
            return productRepository.findByCategoryIgnoreCase(category);
        }
        if (search != null && !search.isBlank()) {
            return productRepository.findByTitleContainingIgnoreCaseOrSkuContainingIgnoreCase(search, search);
        }
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        product.setId(null);
        return productRepository.save(product);
    }

    public Optional<Product> updateProduct(Long id, Product details) {
        return productRepository.findById(id).map(existing -> {
            existing.setTitle(details.getTitle());
            existing.setCategory(details.getCategory());
            existing.setSku(details.getSku());
            existing.setPrice(details.getPrice());
            existing.setStock(details.getStock());
            if (details.getImageUrl() != null) {
                existing.setImageUrl(details.getImageUrl());
            }
            if (details.getRating() != null) {
                existing.setRating(details.getRating());
            }
            return productRepository.save(existing);
        });
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
