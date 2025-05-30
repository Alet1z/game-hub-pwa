package sv.edu.ufg.backend_GO100123.service;

import sv.edu.ufg.backend_GO100123.model.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Integer id);
    Product saveProduct(Product product);
    void deleteProduct(Integer id);
}