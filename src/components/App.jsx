import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { save, load } from './service/storage';

import css from './App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(load('contacts') ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => save('contacts', contacts), [contacts]);

  const submitContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    console.log(isInContacts);
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setFilter('');
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={submitContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <Filter value={filter} handleChangeFilter={changeFilter} />
      ) : (
        <p>Your phonebook i empty. Please add your first contact.</p>
      )}
      {contacts.length > 0 ? (
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      ) : null}
    </div>
  );
};

export default App;
