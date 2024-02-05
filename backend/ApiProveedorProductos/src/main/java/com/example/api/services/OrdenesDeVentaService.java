package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.OrdenesDeVentaImp;
import com.example.api.models.OrdenesDeVenta;
import com.example.api.repositorys.OrdenesDeVentaRepository;

@Service
public class OrdenesDeVentaService implements OrdenesDeVentaImp{

	
	 @Autowired
	 private OrdenesDeVentaRepository ordenesDeVentaRepo;

	@Override
	public OrdenesDeVenta crearOrdenesDeVenta(OrdenesDeVenta ordenesDeVenta) {
		
		return ordenesDeVentaRepo.save(ordenesDeVenta);
	}

	@Override
	public OrdenesDeVenta editarOrdenesDeVenta(OrdenesDeVenta ordenesDeVenta) {
		OrdenesDeVenta ordenDeVentaExistente =ordenesDeVentaRepo.findById(ordenesDeVenta.getIdOrdenVenta()).get();
		ordenDeVentaExistente.setCliente(ordenesDeVenta.getCliente());
		ordenDeVentaExistente.setFechaDeOrden(ordenesDeVenta.getFechaDeOrden());
		return ordenesDeVentaRepo.save(ordenDeVentaExistente);
	}

	@Override
	public String eliminarOrdenesDeVenta(long idOrdenesDeVenta) {
		ordenesDeVentaRepo.deleteById(idOrdenesDeVenta);
		return "";
	}

	@Override
	public OrdenesDeVenta traerOrdenesDeVenta(OrdenesDeVenta ordenesDeVenta) {
		
		return ordenesDeVentaRepo.findById(ordenesDeVenta.getIdOrdenVenta()).get();
	}

	@Override
	public List<OrdenesDeVenta> listarOrdenesDeVenta() {
		
		return ordenesDeVentaRepo.findAll();
	}
	 
	 
	 
}
