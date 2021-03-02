#!/bin/bash


PREFIX=${2:-/usr/local/bin}
VERSAO=$(lsb_release -cs)
REPO="deb [arch=amd64] http://download.virtualbox.org/virtualbox/debian $VERSAO contrib"

install() {
  

  if ! command vboxmanage --version >/dev/null 2>&1; then
    echo "Preparando para instalar Virtualbox..."
    echo "'Adicionando apt-key Virtualbox"

    wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -
    ##wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | sudo apt-key add -


    echo "Removendo repositorio apt caso exista"
    sudo add-apt-repository -r "$REPO"

    echo "Adicionando linha de repositorio apt"
    sudo add-apt-repository "$REPO"
    sudo apt-get update
    echo "Instalando sistema VirtualBox"


    sudo apt-get install virtualbox-6.1
  
  else
    echo "Virtualbox já instalado"
  fi

  if ! command kubectl >/dev/null 2>&1; then
    version=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
    echo "Instalando kubectl versao $version"
    curl -LO "https://storage.googleapis.com/kubernetes-release/release/$version/bin/linux/amd64/kubectl"
    chmod +x kubectl
    mv kubectl "$PREFIX"
  else
    echo "kubetcl ja esta instalado"
  fi

  if ! command minikube >/dev/null 2>&1; then
    curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo chmod +x minikube
    sudo mv minikube "$PREFIX"
  else
    echo "minikube ja esta instalado..."
  fi


}

remove () {
  echo "Removendo VirtualBox e ferramentas... "

  sudo apt remove virtualbox virtualbox-*

  echo "Removendo Minikube e demais ferramentas de $PREFIX"

  sudo rm -i "${PREFIX}/kubectl"
  sudo rm -i "${PREFIX}/minikube"

}

if ! grep -E 'vmx|svm' /proc/cpuinfo > /dev/null; then
  echo "CPU nao suporta virtualizacao"
  exit 1
fi


PS3="Informe a opcao: "
select OPCAO in instalar remover sair
do
echo -e "Escolheu $OPCAO \n"


case $OPCAO in instalar)
echo -e "Voce vai instalar o ambiente Minikube!! \n"
install;;

instalar)

echo "----";;
remover)

echo "Voce vai remover ambiente VirtualBox Kubctl e Minikube."
remove;;
sair)

echo "Saindo do script..."
break;;

*)echo "ERRO: Opcao nao suportada nesta etapa";;

esac
break;
done
