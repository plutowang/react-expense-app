import moment from 'moment'

export default [
    {
      id: "0",
      description: "January Rent",
      note: "This was the fial payment for that address",
      amount: 54500,
      createAt: 0
    },
    {
      id: "1",
      description: "Gum Bill",
      note: "This was the fial payment for gum",
      amount: 900,
      createAt: moment(0)
        .subtract(4, "days")
        .valueOf()
    },
    {
      id: "2",
      description: "Water Bill",
      note: "This was the fial payment for water",
      amount: 1200,
      createAt: moment(0)
        .add(4, "days")
        .valueOf()
    },
    {
      id: "3",
      description: "Gym Bill",
      note: "This was the fial payment for gym",
      amount: 890,
      createAt: moment(0)
        .add(8, "days")
        .valueOf()
    }
  ];