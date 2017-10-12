/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import 'whatwg-fetch';

export default self.fetch.bind(self);
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;
