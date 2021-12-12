import "./Counter.css";
import React from "react";
import CSSProps from "../../data/constants/CSSProps";
import AppSettings from "../../data/AppSettings";
import { withTranslation } from "react-i18next";
import DictionaryProps from "../../data/constants/DictionaryProps.js";

const rx_live = /^\d/;
const defaultLimit = 999;
const currency = "Eur";

function getLimit(limit) {
  if (limit === undefined) return defaultLimit;

  return limit > 0 ? limit : defaultLimit;
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count,
    };
  }

  handleAmountChange = (evt) => {
    if (rx_live.test(evt.target.value)) {
      var amount = evt.target.value;
      if (amount <= getLimit(this.props.limit) && amount >= 0)
        this.setState({ count: amount });
      else this.setState({ count: this.state.count });
    }
    this.props.updateAmount(this.state.count);
  };

  onChangeEvent() {}

  render() {
    const { t } = this.props;
    return (
      <div className={CSSProps.Counter.Area}>
        <div className={CSSProps.Counter.ContainerL + CSSProps.Body.Shrink}>
          <div className={CSSProps.Counter.Label}>
            {t(DictionaryProps.Price)}
          </div>
          <div className={CSSProps.Counter.LabelResult}>
            <div className={CSSProps.Counter.Price}>
              {parseFloat(this.props.price).toFixed(2)} {currency}
            </div>
          </div>
        </div>

        <div className={CSSProps.Counter.ContainerR + CSSProps.Body.Shrink}>
          <div className={CSSProps.Counter.Label}>
            <div className={CSSProps.Counter.CenterText}>
              {t(DictionaryProps.Sum)}
            </div>
          </div>
          <div className={CSSProps.Counter.LabelResult}>
            <div
              className={CSSProps.Counter.Button}
              onClick={() => {
                this.setState({
                  count:
                    this.state.count >= getLimit(this.props.limit)
                      ? getLimit(this.props.limit)
                      : parseInt(this.state.count) + 1,
                });
                this.props.updateAmount(parseInt(this.state.count) + 1);
              }}
            >
              +
            </div>

            <input
              className={CSSProps.Counter.Count}
              type="text"
              name={CSSProps.Counter.Area}
              value={this.state.count}
              maxLength={3}
              onChange={this.handleAmountChange}
            />
            <div
              className={CSSProps.Counter.Button}
              onClick={() =>
                {this.setState({
                  count:
                    this.state.count <= 0 ? 0 : parseInt(this.state.count) - 1,
                });
                this.props.updateAmount(this.state.count <= 0 ? 0 : parseInt(this.state.count) - 1);
              }
              }
            >
              -
            </div>
          </div>
        </div>
        <div
          className={
            CSSProps.Counter.ContainerR +
            CSSProps.Body.Shrink +
            CSSProps.Counter.TotalAdjust
          }
        >
          <div className={CSSProps.Counter.Label}>
            {t(DictionaryProps.Total)}
          </div>
          <div className={CSSProps.Counter.LabelResult}>
            <div className={CSSProps.Counter.Sum}>
              {parseFloat(this.props.price * this.state.count).toFixed(2)}{" "}
              {currency}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation(AppSettings.TranslationFilename)(Counter);
