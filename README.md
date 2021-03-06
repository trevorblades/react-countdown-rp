# react-countdown-rp

A React render prop component that counts down from *now* to a future time

## Installation

```bash
$ npm install react-countdown-rp
```

## Usage

Specify a future time (in milliseconds) in the `endsAt` prop. The countdown will stop once it reaches 0. The `children` function is passed `secondsRemaining` and `msRemaining` numbers that you can use to render elements.

```js
import Countdown from 'react-countdown-rp';

// 10 second countdown
<Countdown endsAt={Date.now() + 10000}>
  {({secondsRemaining, msRemaining}) => (
    <div>
      <h1>{secondsRemaining}</h1>
      <h3>{msRemaining}</h3>
    </div>
  )}
</Countdown>
```

| Prop name   | Type   | Required | Description                                                               |
| ----------- | ------ | -------- | ------------------------------------------------------------------------- |
| endsAt      | number | yes      | Millseconds representing the end date (e.g. `date.getTime()`)             |
| children    | func   | yes      | Called with object `{secondsRemaining, msRemaining}` as the only argument |
| onCompleted | func   | no       | Fired when the countdown reaches 0                                        |
