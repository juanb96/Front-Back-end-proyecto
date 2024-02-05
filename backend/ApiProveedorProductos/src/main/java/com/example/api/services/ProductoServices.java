package com.example.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.ProductoImp;
import com.example.api.models.Producto;
import com.example.api.repositorys.ProductoRepository;



@Service
public class ProductoServices implements ProductoImp{
	
	@Autowired
    private ProductoRepository productoRepository;

	@Override
    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }

	@Override
	public Producto editarProducto(Producto producto) {
	    Producto productoExistente = productoRepository.findById(producto.getIdProducto()).get();
	    productoExistente.setNombre(producto.getNombre());
	    productoExistente.setDescripcion(producto.getDescripcion());
	    productoExistente.setPrecioUnitario(producto.getPrecioUnitario());
	    productoExistente.setStock(producto.getStock());
	    productoExistente.setCategoria(producto.getCategoria());
	    return productoRepository.save(productoExistente);
	}
	

	@Override
	public String eliminarProducto(long idProducto) {
		if (!productoRepository.existsById(idProducto)) {
	        return "El producto con id " + idProducto + " no existe";
	    }
	    
	    productoRepository.deleteById(idProducto);

	    return "Producto eliminado exitosamente";
	}

	@Override
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

	
	
	
}
