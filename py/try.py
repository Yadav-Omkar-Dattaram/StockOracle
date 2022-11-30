import yfinance as yf
import pandas as pd
import datetime
import webbrowser
import datetime

# Retrieving tickers data
ticker_list = pd.read_csv("Indian-Ticker.txt", sep=",", header=None)

tickerOpt = "ITC Limited"  # Select ticker symbol
tickerStr = ticker_list[ticker_list[1] == tickerOpt]
# print(ticker_list[1])
a = tickerStr[0].to_string()
b = tickerStr[1].to_string()
c = tickerStr[2].to_string()
print(c)
tickerSymbol = a[5:]
tickerName = b[5:]
tweeterid = c[9:]
print(tweeterid)
