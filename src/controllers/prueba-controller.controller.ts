// Uncomment these imports to begin using these cool features!

import { authenticate } from "@loopback/authentication";

// import {inject} from '@loopback/core';

@authenticate('admin')
export class PruebaControllerController {
  constructor() {}
}


