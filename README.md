Cathy
=====

A library to enable back-and-forth communication with an underlying script.

## Installation

```bash
npm install @tedslittlerobot/cathy
```

## Usage

Given the following bash script, which has some output and prompts...

```bash
#! /usr/bin/env bash

set -e

>&2 echo "Hello!"

>&2 echo -n "What is your name: "
read -r name
>&2 echo "Hello ${name}"

>&2 echo -n "How old are you? "
read -r age

>&2 echo "You are ${age}! Thanks"
```

The following script will automatically respond

```typescript
import Cathy from '@tedslittlerobot/cathy';

const cathy = new Cathy(execa({stdio: 'pipe'})('./streamtest'));

cathy.converse('What is your name:', 'Jenny Franz');
cathy.converse('How old are you?', '999');

const response = await cathy.run();
```
