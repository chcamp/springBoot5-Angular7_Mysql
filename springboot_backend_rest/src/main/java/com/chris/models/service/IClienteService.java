package com.chris.models.service;

import java.util.List;

import com.chris.models.entity.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll(); 
	
	public Cliente save(Cliente cliente);
	
	public Cliente findById(Long id);
	
	public void delete(Long id);

}

