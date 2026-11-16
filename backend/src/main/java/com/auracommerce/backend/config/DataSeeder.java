package com.auracommerce.backend.config;

import com.auracommerce.backend.model.Customer;
import com.auracommerce.backend.model.Order;
import com.auracommerce.backend.model.Product;
import com.auracommerce.backend.repository.CustomerRepository;
import com.auracommerce.backend.repository.OrderRepository;
import com.auracommerce.backend.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataSeeder {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    CommandLineRunner seedDatabase(ProductRepository productRepo,
                                   OrderRepository orderRepo,
                                   CustomerRepository customerRepo) {
        return args -> {
            if (productRepo.count() == 0) {
                log.info("Seeding products...");
                productRepo.save(new Product("Wireless Pro Noise-Canceling Headphones", "Electronics",
                        "AUD-9021", 24999.0, 45, "In Stock",
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop", 4.5));
                productRepo.save(new Product("Smartwatch Series 8 Titanium Edition", "Wearables",
                        "WCH-8802", 38500.0, 8, "Low Stock",
                        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=200&fit=crop", 4.7));
                productRepo.save(new Product("Mechanical RGB Gaming Keyboard", "Accessories",
                        "KBD-4411", 14800.0, 120, "In Stock",
                        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=200&fit=crop", 4.3));
                productRepo.save(new Product("Ergonomic High-Back Office Chair Mesh", "Furniture",
                        "CHR-1090", 28200.0, 0, "Out of Stock",
                        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=200&fit=crop", 4.6));
                productRepo.save(new Product("Road Bike Helmet Pro Shield", "Sports",
                        "HLM-7700", 7599.0, 32, "In Stock",
                        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop", 4.2));
                productRepo.save(new Product("Portable Solar Power Bank 20000mAh", "Electronics",
                        "PWR-3301", 4299.0, 65, "In Stock",
                        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=200&fit=crop", 4.4));
                log.info("Products seeded successfully.");
            }

            if (orderRepo.count() == 0) {
                log.info("Seeding orders...");
                orderRepo.save(new Order("ORD-9412", "Riya Sharma", "riya.sharma@email.com",
                        "Headphones × 1, Stand × 1", 2, 25999.0, "Completed", "UPI", LocalDate.now().minusDays(2)));
                orderRepo.save(new Order("ORD-9411", "Mohit Verma", "mohit.verma@email.com",
                        "Smartwatch × 1", 1, 38500.0, "Shipped", "Credit Card", LocalDate.now().minusDays(3)));
                orderRepo.save(new Order("ORD-9410", "Ananya Nair", "ananya.nair@email.com",
                        "Keyboard × 2", 2, 29600.0, "Processing", "Net Banking", LocalDate.now().minusDays(1)));
                orderRepo.save(new Order("ORD-9409", "Kabir Das", "kabir.das@email.com",
                        "Office Chair × 1", 1, 28200.0, "Completed", "COD", LocalDate.now().minusDays(5)));
                orderRepo.save(new Order("ORD-9408", "Priya Kapoor", "priya.kapoor@email.com",
                        "Power Bank × 3", 3, 12897.0, "Processing", "UPI", LocalDate.now()));
                orderRepo.save(new Order("ORD-9407", "Arjun Singh", "arjun.singh@email.com",
                        "Helmet × 1, Gloves × 1", 2, 9299.0, "Shipped", "Credit Card", LocalDate.now().minusDays(4)));
                orderRepo.save(new Order("ORD-9406", "Meera Pillai", "meera.pillai@email.com",
                        "Smartwatch × 1, Band × 2", 3, 41200.0, "Completed", "UPI", LocalDate.now().minusDays(6)));
                orderRepo.save(new Order("ORD-9405", "Dev Patel", "dev.patel@email.com",
                        "Keyboard × 1", 1, 14800.0, "Cancelled", "Net Banking", LocalDate.now().minusDays(7)));
                log.info("Orders seeded successfully.");
            }

            if (customerRepo.count() == 0) {
                log.info("Seeding customers...");
                customerRepo.save(new Customer("Riya Sharma", "riya.sharma@email.com",
                        "+91 98201 12345", "VIP", 184500.0, 7, "Active", LocalDate.of(2023, 3, 15)));
                customerRepo.save(new Customer("Mohit Verma", "mohit.verma@email.com",
                        "+91 97302 56789", "Regular", 38500.0, 1, "Active", LocalDate.of(2024, 7, 2)));
                customerRepo.save(new Customer("Ananya Nair", "ananya.nair@email.com",
                        "+91 86503 34567", "VIP", 220000.0, 12, "Active", LocalDate.of(2022, 11, 28)));
                customerRepo.save(new Customer("Kabir Das", "kabir.das@email.com",
                        "+91 73604 78901", "Regular", 56400.0, 3, "Active", LocalDate.of(2024, 1, 10)));
                customerRepo.save(new Customer("Priya Kapoor", "priya.kapoor@email.com",
                        "+91 90905 23456", "Regular", 12897.0, 1, "Active", LocalDate.now().minusDays(1)));
                customerRepo.save(new Customer("Arjun Singh", "arjun.singh@email.com",
                        "+91 88106 67890", "Regular", 9299.0, 1, "Inactive", LocalDate.of(2024, 5, 20)));
                customerRepo.save(new Customer("Meera Pillai", "meera.pillai@email.com",
                        "+91 82207 11234", "VIP", 312000.0, 15, "Active", LocalDate.of(2021, 8, 3)));
                customerRepo.save(new Customer("Dev Patel", "dev.patel@email.com",
                        "+91 76308 45678", "Regular", 0.0, 0, "Inactive", LocalDate.of(2024, 9, 14)));
                log.info("Customers seeded successfully.");
            }
        };
    }
}
