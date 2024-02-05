package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.ProveedorImp;
import com.example.api.models.Proveedor;
import com.example.api.repositorys.ProveedorRepository;

@Service
public class ProveedorServices implements ProveedorImp {

	@Autowired
    private ProveedorRepository proveedorRepository;

    @Override
    public Proveedor crearProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    @Override
    public Proveedor editarProveedor(Proveedor proveedor, long idProveedor) {
    	Proveedor proveedorExistente = proveedorRepository.findById(idProveedor).get();
    	proveedorExistente.setNombreProveedor(proveedor.getNombreProveedor());
    	proveedorExistente.setCorreoElectronico(proveedor.getCorreoElectronico());
    	proveedorExistente.setDireccion(proveedor.getDireccion());
    	proveedorExistente.setNumeroDeTelefono(proveedor.getNumeroDeTelefono());
        return proveedorRepository.save(proveedorExistente);
    }

    @Override
    public String eliminarProveedor(long idProveedor) {
    	proveedorRepository.deleteById(idProveedor);
    	return "";
    	
    }
    @Override
    public List<Proveedor> listarProveedor() {
        return proveedorRepository.findAll();
    }

	
}
