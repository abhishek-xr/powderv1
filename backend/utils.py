import re

def parse_transactions(parsed_text: str):
    """
    Parse the `parsed_text` into structured transaction data.
    """
    transactions = []
    lines = parsed_text.split("\n")
    transaction_pattern = re.compile(
        r"(?P<transaction_id>\d+)\s+(?P<transaction_date>\d{2}/\d{2}/\d{2})\s+(?P<post_date>\d{2}/\d{2}/\d{2})\s+(?P<description>.+?)\s+\$(?P<amount>[\d.,]+)"
    )

    for line in lines:
        match = transaction_pattern.search(line)
        if match:
            transactions.append({
                "transaction_id": match.group("transaction_id"),
                "transaction_date": match.group("transaction_date"),
                "post_date": match.group("post_date"),
                "description": match.group("description"),
                "amount": float(match.group("amount").replace(",", ""))
            })

    return transactions
