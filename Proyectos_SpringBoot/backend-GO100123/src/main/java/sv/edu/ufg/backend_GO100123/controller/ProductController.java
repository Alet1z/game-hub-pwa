package sv.edu.ufg.backend_GO100123.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.edu.ufg.backend_GO100123.model.Product;
import sv.edu.ufg.backend_GO100123.service.ProductService;
import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProducto(@RequestBody Product producto) {
        return productService.saveProduct(producto);
    }

    @PutMapping("/{id}")
    public Product updateProducto(@PathVariable Integer id, @RequestBody Product producto) {
        producto.setId(id);
        return productService.saveProduct(producto);
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }
}