package sv.edu.ufg.backend_GO100123.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.ufg.backend_GO100123.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}