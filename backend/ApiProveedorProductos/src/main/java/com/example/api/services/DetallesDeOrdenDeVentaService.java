package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.DetallesDeOrdenDeVentaImp;
import com.example.api.models.DetallesDeOrdenDeVenta;
import com.example.api.repositorys.DetallesDeOrdenDeVentaRepository;
@Service
public class DetallesDeOrdenDeVentaService implements DetallesDeOrdenDeVentaImp{

	@Autowired
	private DetallesDeOrdenDeVentaRepository detallesOrdenDeVentaRepo;
	
	@Override
	public DetallesDeOrdenDeVenta crearDetallesDeOrdenDeVenta(DetallesDeOrdenDeVenta detallesDeOrdenDeVenta) {
		return detallesOrdenDeVentaRepo.save(detallesDeOrdenDeVenta);
	}

	@Override
	public DetallesDeOrdenDeVenta editarDetallesDeOrdenDeVenta(DetallesDeOrdenDeVenta detallesDeOrdenDeVenta) {
		DetallesDeOrdenDeVenta detallesDeOrdenDeVentaExistente = detallesOrdenDeVentaRepo.findById(detallesDeOrdenDeVenta.getIdDetalleOrdenVenta()).get();
		detallesDeOrdenDeVentaExistente.setCantidad(detallesDeOrdenDeVenta.getCantidad());
		detallesDeOrdenDeVentaExistente.setProducto(detallesDeOrdenDeVenta.getProducto());
		detallesDeOrdenDeVentaExistente.setOrdenVenta(detallesDeOrdenDeVenta.getOrdenVenta());
		detallesDeOrdenDeVentaExistente.setPrecioUnitario(detallesDeOrdenDeVenta.getPrecioUnitario());
		
		return detallesOrdenDeVentaRepo.save(detallesDeOrdenDeVentaExistente);
	}

	@Override
	public String eliminarDetallesDeOrdenDeVenta(long idDetallesDeOrdenDeVenta) {
		 detallesOrdenDeVentaRepo.deleteById(idDetallesDeOrdenDeVenta);
		 return "";

	}

	@Override
	public DetallesDeOrdenDeVenta traerDetallesDeOrdenDeVenta(DetallesDeOrdenDeVenta detallesDeOrdenDeVenta) {
		return detallesOrdenDeVentaRepo.findById(detallesDeOrdenDeVenta.getIdDetalleOrdenVenta()).get();
	}

	@Override
	public List<DetallesDeOrdenDeVenta> listarDetallesDeOrdenDeVenta() {
		return detallesOrdenDeVentaRepo.findAll();
	}

}
