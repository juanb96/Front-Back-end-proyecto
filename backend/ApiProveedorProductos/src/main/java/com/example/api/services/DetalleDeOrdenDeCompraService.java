package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.DetalleDeOrdenDeCompraImp;
import com.example.api.models.DetalleDeOrdenDeCompra;
import com.example.api.repositorys.DetalleDeOrdenDeCompraRepository;

@Service
public class DetalleDeOrdenDeCompraService implements DetalleDeOrdenDeCompraImp{
	
	@Autowired
	private DetalleDeOrdenDeCompraRepository detalleDeOrdenDeCompraRepo; 

	@Override
	public DetalleDeOrdenDeCompra crearDetalleDeOrdenDeCompra(DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) {
		return detalleDeOrdenDeCompraRepo.save(detalleDeOrdenDeCompra);
	}

	@Override
	public DetalleDeOrdenDeCompra editarDetalleDeOrdenDeCompra(DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) {
		DetalleDeOrdenDeCompra detalleDeOrdenDeCompraExistente = detalleDeOrdenDeCompraRepo.findById(detalleDeOrdenDeCompra.getIdDetalleOrdenCompra()).get();
		detalleDeOrdenDeCompraExistente.setOrdenDeCompra(detalleDeOrdenDeCompra.getOrdenDeCompra());
		detalleDeOrdenDeCompraExistente.setProducto(detalleDeOrdenDeCompra.getProducto());
		detalleDeOrdenDeCompraExistente.setCantidad(detalleDeOrdenDeCompra.getCantidad());
		detalleDeOrdenDeCompraExistente.setPrecioUnitario(detalleDeOrdenDeCompra.getPrecioUnitario());
		return detalleDeOrdenDeCompraRepo.save(detalleDeOrdenDeCompraExistente);
		
	}

	@Override
	public String eliminarDetalleDeOrdenDeCompra(long idDetalleDeOrdenDeCompra) {
		detalleDeOrdenDeCompraRepo.deleteById(idDetalleDeOrdenDeCompra);
		return "";
	}

	@Override
	public DetalleDeOrdenDeCompra traerDetalleDeOrdenDeCompra(DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) {
		
		return detalleDeOrdenDeCompraRepo.findById(detalleDeOrdenDeCompra.getIdDetalleOrdenCompra()).get();
	}

	@Override
	public List<DetalleDeOrdenDeCompra> listarDetalleDeOrdenDeCompras() {
		return detalleDeOrdenDeCompraRepo.findAll();
	}

}
