import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('immutably adds items to state', () => {
  Math.random = (() => {
    let count = 0;
    return () => count++;
  })();

  const cmp = mount(<App/>);
  expect(toJson(cmp)).toMatchSnapshot();
  cmp.find('#immutable-add').simulate('click');
  expect(toJson(cmp)).toMatchSnapshot();
  cmp.find('#immutable-add').simulate('click');
  expect(toJson(cmp)).toMatchSnapshot();

  expect(cmp.find('li').length).toBe(2);
});

it('mutably adds items to state but does not re-render', () => {
  const cmp = mount(<App/>);
  expect(toJson(cmp)).toMatchSnapshot();
  cmp.find('#mutable-add').simulate('click');
  expect(toJson(cmp)).toMatchSnapshot();
  cmp.find('#mutable-add').simulate('click');
  expect(toJson(cmp)).toMatchSnapshot();

  expect(cmp.find('li').length).toBe(0);
});

it('renders after an immutable add', () => {
  const cmp = mount(<App/>);
  expect(toJson(cmp)).toMatchSnapshot();
  cmp.find('#mutable-add').simulate('click');
  expect(cmp.find('li').length).toBe(0);
  cmp.find('#immutable-add').simulate('click');
  expect(cmp.find('li').length).toBe(2);
});
