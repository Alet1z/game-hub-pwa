package sv.edu.ufg.backend_BG100223.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.ufg.backend_BG100223.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
