import React, { useState } from "react";
import { telMask, verificarDataDeseja } from "../../config/mask";
import { Junta, Container, Plus, Dupla, List } from "../../styles/pageStyled";
import validator from "validator";
import { TiDeleteOutline } from "react-icons/ti";
import InputMask from "react-input-mask";

interface AllProps {
  next: boolean;
  setNext: Function;
  estado_deseja: string;
  setEstado_deseja: Function;
  data_deseja: string;
  setData_deseja: Function;
  tempo_deseja: string;
  setTempo_deseja: Function;
  Ntempo_deseja: string;
  setNTempo_deseja: Function;
  Ttempo_deseja: string;
  setTTempo_deseja: Function;
  hotel: string;
  setHotel: Function;
  viajar_junto: string;
  setViajar_junto: Function;
  Sviajar_junto: string;
  setSViajar_junto: Function;
  Aviajar_junto: Array<string>;
  setAViajar_junto: Function;
  pagar_viagem: string;
  setPagar_viagem: Function;
  Spagar_viagem: string;
  setSPagar_viagem: Function;
  Gpagar_viagem: string;
  setGPagar_viagem: Function;
  Npagar_viagem: string;
  NetGPagar_viagem: Function;
  Tpagar_viagem: string;
  setTPagar_viagem: Function;
  Epagar_viagem: string;
  NetEPagar_viagem: Function;
}

const Pag4 = (props: AllProps) => {
  const [viajar_junto, setViajar_junto] = useState("");
  const [Gviajar_junto, setGViajar_junto] = useState("");
  const [cont, setCont] = useState(0);
  const [mask, setMask] = useState("(99) 99999-9999");
  const addPessoa = () => {
    if (viajar_junto != "" && Gviajar_junto != "") {
      let pessoa = `${Gviajar_junto.replace(/,/g, " ")} - 
      ${viajar_junto.replace(/,/g, " ")}`;
      props.setAViajar_junto((oldArray: any) => [...oldArray, pessoa]);
      setViajar_junto("");
      setGViajar_junto("");
    }
  };

  const removePessoa = (index: number) => {
    props.setAViajar_junto(() => [
      ...props.Aviajar_junto.slice(0, index),
      ...props.Aviajar_junto.slice(index + 1, props.Aviajar_junto.length),
    ]);
    setCont(0);
  };

  const handleKeyPress = (event: any) => {
    event.preventDefault();
    if (event.key === "Enter") {
      addPessoa();
    }
  };

  if (props.Spagar_viagem == "nao") {
    if (
      props.Gpagar_viagem != "" &&
      props.Npagar_viagem != "" &&
      props.Tpagar_viagem != "" &&
      props.Epagar_viagem != "" &&
      props.Gpagar_viagem != undefined &&
      props.Npagar_viagem != undefined &&
      props.Tpagar_viagem != undefined &&
      props.Epagar_viagem != undefined
    ) {
      props.setPagar_viagem(
        `${props.Gpagar_viagem.replace(/-/g, " ")} - 
        ${props.Npagar_viagem.replace(/-/g, " ")} - 
        Tel: ${props.Tpagar_viagem.replace(/-/g, " ")} - 
        E-mail: ${props.Epagar_viagem.replace(/-/g, " ")}`
      );
    } else {
      props.setPagar_viagem("");
    }
  }
  if (props.Sviajar_junto == "nao") {
    if (props.Aviajar_junto.length > 0) {
      props.setViajar_junto(props.Aviajar_junto.toString() + ",");
    } else {
      if (cont == 0) {
        props.setViajar_junto([]);
        setCont(1);
      }
    }
  }

  if (
    props.estado_deseja == "" ||
    !validator.isDate(verificarDataDeseja(props.data_deseja)) ||
    props.Ntempo_deseja == "" ||
    props.viajar_junto == "" ||
    props.hotel == "" ||
    props.pagar_viagem == ""
  ) {
    props.setNext(true);
  } else {
    props.setTempo_deseja(`${props.Ntempo_deseja} ${props.Ttempo_deseja}`);
    props.setNext(false);
  }

  return (
    <Container>
      <Junta>
        <label>Estado que pretende viajar</label>
        <input
          maxLength={148}
          value={props.estado_deseja}
          alt={"Estado que pretende viajar"}
          onChange={(e) => props.setEstado_deseja(e.target.value)}
        />
        <br />
      </Junta>

      <Junta>
        {props.data_deseja.replace("_", "").length == 10 &&
        !validator.isDate(verificarDataDeseja(props.data_deseja)) ? (
          <label>Data que pretende viajar (Data inválida)</label>
        ) : (
          <label>Data que pretende viajar</label>
        )}

        <InputMask
          mask={"99/99/9999"}
          type={"tel"}
          alt={"Data que pretende viajar"}
          value={props.data_deseja}
          onChange={(e) => props.setData_deseja(e.target.value)}
        />
        <br />
      </Junta>

      <Junta>
        <label>Quanto tempo deseja ficar</label>
        <Plus className="ajsM">
          <input
            value={props.Ntempo_deseja}
            type={"tel"}
            maxLength={35}
            alt={"Quanto tempo deseja ficar"}
            onChange={(e) => props.setNTempo_deseja(e.target.value)}
          />
          <select
            value={props.Ttempo_deseja}
            onChange={(e) => {
              props.setTTempo_deseja(e.target.value);
            }}
          >
            <option value={"Dia (s)"}>Dia (s)</option>
            <option value={"Mês (es)"}>Mês (es)</option>
          </select>
        </Plus>
        <br />
      </Junta>

      <Junta>
        <label>Hotel que pretende ficar</label>
        <input
          value={props.hotel}
          maxLength={148}
          alt={"Hotel que pretende ficar"}
          onChange={(e) => props.setHotel(e.target.value)}
        />
        <br />
      </Junta>

      <Junta>
        <label>Você irá pagar pela viagem ?</label>
        <label>
          <input
            type={"radio"}
            value={"sim"}
            alt={"Você irá pagar pela viagem"}
            checked={props.Spagar_viagem === "sim"}
            onChange={() => {
              props.setSPagar_viagem("sim");
              props.setPagar_viagem("Própria pessoa");
            }}
          />{" "}
          Sim
        </label>
        <label>
          <input
            type={"radio"}
            value={"nao"}
            alt={"Outra pessoa vai pagar pela viagem"}
            checked={props.Spagar_viagem === "nao"}
            onChange={() => {
              props.setSPagar_viagem("nao");
              props.setPagar_viagem("");
              props.NetGPagar_viagem("");
              props.setGPagar_viagem("");
              props.NetEPagar_viagem("");
              props.setTPagar_viagem("");
            }}
          />{" "}
          Não
        </label>
        <br />
      </Junta>
      {props.Spagar_viagem === "nao" ? (
        <div className="box1">
          <Junta className="cel">
            <h3>Quem irá pagar ?</h3>
            <Dupla>
              <Junta className="jum">
                <label>Grau de parentesco</label>
                <input
                  maxLength={98}
                  value={props.Gpagar_viagem}
                  alt={"Grau de parentesco"}
                  placeholder="Grau de parentesco"
                  onChange={(e) => props.setGPagar_viagem(e.target.value)}
                />
              </Junta>
              <Junta className="jum">
                <label>Nome completo</label>
                <input
                  value={props.Npagar_viagem}
                  maxLength={198}
                  alt={"Nome completo"}
                  placeholder="Nome completo"
                  onChange={(e) => props.NetGPagar_viagem(e.target.value)}
                />
              </Junta>
            </Dupla>
            <Dupla>
              <Junta className="jum">
                <label>Telefone</label>
                <InputMask
                  mask={mask}
                  onBlur={(e) => {
                    if (e.target.value.replace("_", "").length === 14) {
                      setMask("(99) 9999-9999");
                      props.setTPagar_viagem(telMask(e.target.value));
                    }
                  }}
                  onFocus={(e) => {
                    if (e.target.value.replace("_", "").length === 14) {
                      setMask("(99) 99999-9999");
                    }
                  }}
                  type={"tel"}
                  alt={"Telefone"}
                  value={props.Tpagar_viagem}
                  placeholder="Telefone"
                  onChange={(e) => props.setTPagar_viagem(e.target.value)}
                />
              </Junta>
              <Junta>
                <label>E-mail</label>
                <input
                  value={props.Epagar_viagem}
                  maxLength={198}
                  type={"email"}
                  alt={"E-mail"}
                  placeholder="E-mail"
                  onChange={(e) => props.NetEPagar_viagem(e.target.value)}
                />
              </Junta>
            </Dupla>
            <br />
            <br />
          </Junta>
        </div>
      ) : (
        <>
          <br />
        </>
      )}

      <Junta>
        <label>Você vai viajar sozinho ?</label>
        <label>
          <input
            type={"radio"}
            value={"sim"}
            alt={"Você vai viajar sozinho"}
            checked={props.Sviajar_junto === "sim"}
            onChange={() => {
              props.setSViajar_junto("sim");
              props.setViajar_junto("Ninguém");
            }}
          />{" "}
          Sim
        </label>
        <label>
          <input
            type={"radio"}
            value={"nao"}
            alt={"Você não vai viajar sozinho"}
            checked={props.Sviajar_junto === "nao"}
            onChange={() => {
              props.setSViajar_junto("nao");
              props.setViajar_junto("");
              props.setAViajar_junto([]);
            }}
          />{" "}
          Não
        </label>
        <br />
      </Junta>
      {props.Sviajar_junto === "nao" ? (
        <div className="box1">
          <Junta className="cel">
            <h3>Quem irá com você ? (todos)</h3>
            <Dupla>
              <Junta>
                <label>Grau de parentesco</label>
                <input
                  value={Gviajar_junto}
                  alt={"Grau de parentesco"}
                  placeholder="Grau de parentesco"
                  onKeyUp={(e) => {
                    handleKeyPress(e);
                  }}
                  onChange={(e) => setGViajar_junto(e.target.value)}
                />
              </Junta>
              <Junta>
                <label>Nome completo</label>
                <input
                  value={viajar_junto}
                  alt={"Nome completo"}
                  placeholder="Nome completo"
                  onKeyUp={(e) => {
                    handleKeyPress(e);
                  }}
                  onChange={(e) => setViajar_junto(e.target.value)}
                />
                <button className="centralizar" onClick={addPessoa}>
                  Adicionar
                </button>
              </Junta>
            </Dupla>
          </Junta>
          <br />
          <List>
            <h3>Viajar junto</h3>
            {props.Aviajar_junto?.map((pessoa, index) => (
              <Plus key={index} className="centralizar">
                <p>{pessoa}</p>
                <TiDeleteOutline
                  color="red"
                  className="pt"
                  onClick={() => {
                    removePessoa(index);
                  }}
                />
              </Plus>
            ))}
            <br />
          </List>
        </div>
      ) : (
        <>
          <Junta className="nul">
            <label>(a)</label>
            <input />
          </Junta>
        </>
      )}
    </Container>
  );
};

export default Pag4;
