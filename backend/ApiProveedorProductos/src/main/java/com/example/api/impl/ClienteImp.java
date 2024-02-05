package com.example.api.impl;

import java.util.List;

import com.example.api.models.Cliente;

public interface ClienteImp {
	
	public Cliente crearCliente(Cliente cliente);
	public Cliente editarCliente(Cliente cliente);
	public String eliminarCliente(long idCliente);
	public Cliente traerCliente(Cliente cliente);
	public List<Cliente>listarClientes();

}
