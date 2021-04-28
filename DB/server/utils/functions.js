const { All_Data } = require("../../models");
const { Op, literal, Sequelize } = require("sequelize");

async function getAnswer(data) {
  if (data.tamplate_id <= 10) {
    const {
      column,
      question_type,
      tamplate_id,
      option_1,
      option_2,
      option_3,
      option_4,
    } = data;
    const optionsArr = await All_Data.findAll({
      where: {
        country: { [Op.or]: [option_1, option_2, option_3, option_4] },
      },
      attributes: [column, "country"],
    });
    const finalOption = optionsArr.reduce(
      (previousLargestNumber, currentLargestNumber) => {
        if (
          data.tamplate_id === 2 ||
          data.tamplate_id === 4 ||
          data.tamplate_id === 6
        ) {
          return currentLargestNumber[column] < previousLargestNumber[column]
            ? currentLargestNumber
            : previousLargestNumber;
        } else {
          return currentLargestNumber[column] > previousLargestNumber[column]
            ? currentLargestNumber
            : previousLargestNumber;
        }
      }
    );
    return finalOption["country"];
  } else if (11 <= data.tamplate_id && data.tamplate_id <= 13) {
    const { column, XXX } = data;
    const answer = await All_Data.findOne({
      where: {
        country: XXX,
      },
      attributes: [column],
    });
    return answer[column];
  } else if (14 <= data.tamplate_id && data.tamplate_id <= 20) {
    let finalAnswer = "";
    const { column, YYY, XXX } = data;
    const options = await All_Data.findAll({
      where: {
        country: { [Op.or]: [XXX, YYY] },
      },
      attributes: [column, "country"],
    });
    const answer = options.reduce(
      (previousLargestNumber, currentLargestNumber) => {
        return currentLargestNumber[column] > previousLargestNumber[column]
          ? currentLargestNumber
          : previousLargestNumber;
      }
    );
    if (answer.country === XXX) {
      finalAnswer = "true";
    } else {
      finalAnswer = "false";
    }

    return finalAnswer;
  }
}
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function getCountryFromData(column, numberOfOptions, questionID) {
  if (questionID === 13) {
    return All_Data.findOne({
      attributes: [column, "country"],
      order: literal("rand()"),
      limit: 1,
    })
      .then((result) => {
        return result.toJSON();
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    return All_Data.findAll({
      where: {
        [column]: { [Op.not]: null },
      },
      attributes: ["country", column],
      order: literal("rand()"),
      limit: numberOfOptions,
    })
      .then((results) => {
        return results.map((result) => result.toJSON());
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = { getCountryFromData, random, getAnswer };
