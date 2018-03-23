import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LineChart, ResponsiveContainer, Line, YAxis, Tooltip } from 'recharts';

import withChartData from 'containers/components/Chart';

import Button from 'ui/components/Button';
import css from './chart.css';

/**
 * Chart component to display historical IOTA price charts
 */
class Chart extends PureComponent {
    static propTypes = {
        /** Current price data for selected currency */
        priceData: PropTypes.shape({
            currency: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            volume: PropTypes.string.isRequired,
            change24h: PropTypes.string.isRequired,
            mcap: PropTypes.string.isRequired,
        }).isRequired,
        /** Chart data */
        chartData: PropTypes.shape({
            data: PropTypes.array.isRequired,
            timeframe: PropTypes.string.isRequired,
            yAxis: PropTypes.shape({
                ticks: PropTypes.array.isRequired,
            }),
        }).isRequired,
        /** Change chart currency */
        setCurrency: PropTypes.func.isRequired,
        /** Change chart time frame */
        setTimeframe: PropTypes.func.isRequired,
        /** Get current market price for a currency
         * @param {string} currency - Target currency
         */
        getPriceForCurrency: PropTypes.func.isRequired,
        /** Style price to current currency format
         * @param {number} price - Input price value for formatting
         */
        getPriceFormat: PropTypes.func.isRequired,
        /** Theme settings
         * @ignore
         */
        theme: PropTypes.object.isRequired,
        /** Translation helper
         * @param {string} translationString - locale string identifier to be translated
         * @ignore
         */
        t: PropTypes.func.isRequired,
    };

    renderTooltip(props) {
        if (props.active) {
            return <p className={css.label}>{props.payload[0].value}</p>;
        }
    }

    render() {
        const {
            priceData,
            chartData,
            theme,
            setCurrency,
            setTimeframe,
            getPriceFormat,
            getPriceForCurrency,
            t,
        } = this.props;

        return (
            <div className={css.chart}>
                <div>
                    <ResponsiveContainer height="100%" width="100%">
                        <LineChart data={chartData.data}>
                            <Line strokeWidth={2} type="linear" dataKey="y" stroke={theme.chart.color} dot={false} />
                            <YAxis
                                interval="preserveStartEnd"
                                strokeWidth={0}
                                width={0}
                                label=""
                                domain={['dataMin', 'dataMax']}
                            />
                            <Tooltip content={this.renderTooltip} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <hr />
                <nav>
                    <Button variant="secondary" className="outline" onClick={() => setCurrency()}>
                        {priceData.currency}
                    </Button>
                    <p>
                        {priceData.symbol} {getPriceFormat(getPriceForCurrency(priceData.currency))} / Mi
                    </p>
                    <Button variant="secondary" className="outline" onClick={() => setTimeframe()}>
                        {chartData.timeframe}
                    </Button>
                </nav>
                <ul>
                    <li>
                        {t('chart:mcap')}: $ {priceData.mcap}
                    </li>
                    <li>
                        {t('chart:change')}: {priceData.change24h}%
                    </li>
                    <li>
                        {t('chart:volume')} (24h): $ {priceData.volume}
                    </li>
                </ul>
            </div>
        );
    }
}

export default withChartData(Chart);
