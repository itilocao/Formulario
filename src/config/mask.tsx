export const dataMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
};

export const verificarDataNascimento = (data: string) => {
  var dia = data.split("/")[0];
  var mes = data.split("/")[1];
  var ano = data.split("/")[2];
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  if (parseInt(ano) >= 1900 && parseInt(ano) <= anoAtual) {
    return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  } else {
    return "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  }
};

export const verificarDataDeseja = (data: string) => {
  var dia = data.split("/")[0];
  var mes = data.split("/")[1];
  var ano = data.split("/")[2];
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  if (parseInt(ano) >= anoAtual) {
    return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  } else {
    return "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  }
};

export const telMask = (value: string) => {
  if (value.length >= 15) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  } else {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }
};

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};
