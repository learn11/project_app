resource "azurerm_resource_group" "vm_rg" {
  name     = var.rg_name
  location = var.rg_location

}
resource "azurerm_virtual_network" "maor" {
  name ="basic_vm_vnet"
  address_space = ["10.0.0.0/16"]
  location = var.rg_location
  resource_group_name = var.rg_name

  depends_on = [azurerm_resource_group.vm_rg]
}
resource "azurerm_subnet" "vnet_subnet"{
  name = "backend"
  resource_group_name = var.rg_name
  virtual_network_name = azurerm_virtual_network.maor.name
  address_prefixes = ["10.0.2.0/24"]

  depends_on = [azurerm_virtual_network.maor]
}
resource "azurerm_linux_virtual_machine" "edmon" {
  name                  = "myVM"
  location              = var.rg_location
  resource_group_name   = azurerm_resource_group.vm_rg.name
  network_interface_ids = [azurerm_network_interface.my_terraform_nic.id]
  size                  = "Standard_DS1_v2"

  os_disk {
    name                 = "myOsDisk"
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  computer_name  = "hostname"
  admin_username = var.username

  admin_ssh_key {
    username   = var.username
    public_key = jsondecode(azapi_resource_action.ssh_public_key_gen.output).publicKey
  }

  boot_diagnostics {
    storage_account_uri = azurerm_storage_account.my_storage_account.primary_blob_endpoint
  }
}