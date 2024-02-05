package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.ClienteImp;
import com.example.api.models.Cliente;
import com.example.api.repositorys.ClienteRepository;
@Service
public class ClienteService implements ClienteImp {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente crearCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente editarCliente(Cliente cliente) {
     Cliente clienteExistente =clienteRepository.findById(cliente.getIdCliente()).get();
     clienteExistente.setDireccion(cliente.getDireccion());
     clienteExistente.setCorreoElectronico(cliente.getCorreoElectronico());
     clienteExistente.setNombreCliente(cliente.getNombreCliente());
     clienteExistente.setNumeroDeTelefono(cliente.getNumeroDeTelefono());
            return clienteRepository.save(clienteExistente);
    }

    public String eliminarCliente(long idCliente) {
       clienteRepository.deleteById(idCliente);
       return "";
    }

    public Cliente traerCliente(Cliente cliente) {
    return clienteRepository.findById(cliente.getIdCliente()).get();
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }
}

