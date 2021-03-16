import React, { useState, useEffect } from "react";
import "./App.css";
import CustomerService from "./services/customer";
import Customer from "./Customer";
import CustomerAdd from "./CustomerAdd";

const CustomerList = ({ setMessage, setShowMessage, setIsPositive }) => {
  const [customers, setCustomers] = useState([]); // useState hook, tyhjä taulukko oletusarvo
  const [näytetäänkö, setNäytetäänkö] = useState(false);
  const [lisäysTila, setLisäystila] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    CustomerService.getAll().then((data) => {
      setCustomers(data);
      //console.log(data);
    });
  }, [näytetäänkö]);

  const handleSearchInputChange = (event) => {
    setNäytetäänkö(true);
    setSearch(event.target.value.toLowerCase());
  };

  const handleDeleteClick = (id) => {
    const customer = customers.find((cust) => cust.customerId === id);
    // const confirm = window.confirm(`Are you sure you want to permanently remove: ${customer.companyName}`);

    // if (confirm) {
    CustomerService.remove(id)
      .then((response) => {
        // setCustomers(customers.filter((filtered) => filtered.id !== id)); // Customers tilan pävitys -> customereista tulee filteder nimisiä. Ne joiden id on eri kuin poistettavan saavat jäädä.
        if (response.status === 200) {
          setMessage(`${customer.companyName} deleted!`);
          setIsPositive(true);
          setShowMessage(true);
          setNäytetäänkö(false);

          setTimeout(() => {
            setShowMessage(false);
          }, 4000);
        }
      })

      .catch((error) => {
        setMessage(`Error: ${error}`);
        setIsPositive(false);
        setShowMessage(true);
        setNäytetäänkö(false);

        setTimeout(() => {
          setShowMessage(false);
        }, 7000);
      });
    // }
  };

  return (
    <div className="container">
      <h1
        title="Show/Hide customers"
        style={{ cursor: "pointer" }}
        onClick={() => setNäytetäänkö(!näytetäänkö)}
      >
        Customers <button onClick={() => setLisäystila(true)}>Add new</button>
      </h1>

      {!lisäysTila && (
        <p>
          <br />
          <input
            value={search}
            onChange={handleSearchInputChange}
            placeholder="Search (customer name)"
          />
          <br />
        </p>
      )}

      {customers &&
        näytetäänkö === true &&
        lisäysTila === false &&
        // eslint-disable-next-line array-callback-return
        customers.map((customer) => {
          const caseInsensName = customer.companyName.toLowerCase();
          if (caseInsensName.indexOf(search) > -1) {
            return (
              <Customer
                key={customer.customerId}
                customer={customer}
                handleDeleteClick={handleDeleteClick}
              />
            );
          }
        })}

      {customers.length === 0 && <p>No results</p>}

      {lisäysTila && (
        <CustomerAdd
          setLisäystila={setLisäystila}
          setNäytetäänkö={setNäytetäänkö}
          customers={customers}
          setCustomers={setCustomers}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          setIsPositive={setIsPositive}
        />
      )}
    </div>
  );
};

// customer && = Ehdollinen renderöinti eli jos customers on tosi (eli löytyy) niin silloin renderöidään customers.map(customer)......
// customers.map(customer) = Javascipt MAP-funktio (https://www.w3schools.com/jsref/jsref_map.asp):
// Customers on taulukollinen customers-olioita.
// MAP looppaa ne läpi.
// Sen tuloksena jokaiselta loopin kierrokselta tulee yksi customer.
// Jokaisen customerin kohdalla renderöidään Customer komponentti.
// Sinne välitetään propsi customer joka on yksi customer (mappauksen tuloksena)
// ** customer.companyname pienelllä caseInsensName vakioon
// ** Javascript indexof metodilla katsotaan onko asiakkaan nimessä search tilan sisältämiä merkkejä
// ** Eli jos tila on (kuten oletuksena ) "" tulevat kaikki asiakkaat jne.
// https://www.w3schools.com/jsref/jsref_indexof.asp

export default CustomerList;
