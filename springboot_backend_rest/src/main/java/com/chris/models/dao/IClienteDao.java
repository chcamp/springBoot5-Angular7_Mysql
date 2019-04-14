package com.chris.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.chris.models.entity.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long>{
	
	
}
