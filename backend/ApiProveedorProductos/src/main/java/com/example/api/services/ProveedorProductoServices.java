package com.example.api.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.ProveedorProductoImp;
import com.example.api.models.ProveedorProducto;
import com.example.api.repositorys.ProveedorProductoRepository;
@Service
public class ProveedorProductoServices implements ProveedorProductoImp{
	
	@Autowired
	private ProveedorProductoRepository proveedorProductoRepo;

	public ProveedorProducto crearProveedorProducto(ProveedorProducto proveedorProducto) {
	    return proveedorProductoRepo.save(proveedorProducto);
	}

	public ProveedorProducto editarProveedorProducto(ProveedorProducto proveedorProducto) {
	    ProveedorProducto proveedorProductoExistente = proveedorProductoRepo.findById(proveedorProducto.getIdProveedorProducto()).get();
	    proveedorProductoExistente.setProducto(proveedorProducto.getProducto());
	    proveedorProductoExistente.setProveedor(proveedorProducto.getProveedor());
	    return proveedorProductoRepo.save(proveedorProductoExistente);
	}

	public String eliminarProveedorProducto(long idProveedorProducto) {
	    Optional<ProveedorProducto> proveedorProductoExistente = proveedorProductoRepo.findById(idProveedorProducto);
	    if (proveedorProductoExistente.isPresent()) {
	    	proveedorProductoRepo.deleteById(idProveedorProducto);
	        return "Proveedor-producto con ID " + idProveedorProducto + " eliminado exitosamente.";
	    }
	    throw new NoSuchElementException("No se encontró el proveedor-producto con ID " + idProveedorProducto);
	}

	public List<ProveedorProducto> listarProveedorProducto() {
	    return proveedorProductoRepo.findAll();
	}


}
