package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.OrdenDeCompraImp;
import com.example.api.models.OrdenDeCompra;
import com.example.api.repositorys.OrdenDeCompraRepository;

@Service
public class OrdenDeCompraService implements OrdenDeCompraImp{

	@Autowired	
	private OrdenDeCompraRepository ordenDeCompraRepo;
	
	@Override
	public OrdenDeCompra crearOrdenDeCompra(OrdenDeCompra ordenDeCompra) {
		return ordenDeCompraRepo.save(ordenDeCompra);
	}

	@Override
	public OrdenDeCompra editarOrdenDeCompra(OrdenDeCompra ordenDeCompra) {
		OrdenDeCompra ordenDeCompraExistente= ordenDeCompraRepo.findById(ordenDeCompra.getIdOrdenCompra()).get();
		ordenDeCompraExistente.setFechaDeOrden(ordenDeCompra.getFechaDeOrden());
		ordenDeCompraExistente.setProveedor(ordenDeCompra.getProveedor());
		// TODO Auto-generated method stub
		return ordenDeCompraRepo.save(ordenDeCompraExistente);
	}

	@Override
	public String eliminarOrdenDeCompra(long idOrdenDeCompra) {
		ordenDeCompraRepo.deleteById(idOrdenDeCompra);
		return "";
	}

	@Override
	public OrdenDeCompra traerOrdenDeCompra(OrdenDeCompra ordenDeCompra) {
		return ordenDeCompraRepo.findById(ordenDeCompra.getIdOrdenCompra()).get();
	}

	@Override
	public List<OrdenDeCompra> listarOrdenDeCompras() {
		return ordenDeCompraRepo.findAll();
	}

}
