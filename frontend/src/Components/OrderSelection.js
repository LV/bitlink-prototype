import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import Navbar from "./Navbar";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

export default function OrderSelection() {
	const [ rowData, setRowData ] = useState(null);
	const [ isSubscriptionPurchase, setIsSubscriptionPurchase ] = useState(false);

	const oneTimePurchaseCols = [
		{field: 'order_id'},
		{field: 'conversion_rate'},
		{field: 'total_usd_price'},
	];

	const subscriptionCols = [
		{field: 'order_id'},
    {field: 'conversion_rate'},
    {field: 'charge_usd_price'},
    {field: 'billing_frequency'},
    {field: 'billing_duration'}
	];

  const [ columnDefs, setColumnDefs ] = useState(oneTimePurchaseCols);

	useEffect(() => {
		axios.get(`http://localhost:8080/purchaseSelection`, {
			params: {
				subTable: isSubscriptionPurchase,
        order_id: true,
        conversion_rate: true,
        usd_price: true,
        priceLessThan: 400,
        billing_frequency: true,
        billing_duration: true,
			}
		}).then((response) => {
			const { data } = response;
			setRowData(data);
			if(isSubscriptionPurchase) setColumnDefs(subscriptionCols);
			else setColumnDefs(oneTimePurchaseCols);
		});
	}, [isSubscriptionPurchase]);

	const handleChange = (event) => {
		setIsSubscriptionPurchase(event.target.value);
	};

	return (
		<>
		  <Navbar orSel={true} />
			<FormControl variant="standard" style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex_start',
				height: 100,
				marginTop: 20,
			}}>
				<Box sx={{ width:220 }}>
					<FormControl fullWidth>
						<InputLabel id='demo-select-small'>Transaction Type</InputLabel>
						<Select
							lableId='demo-select-small'
							id='demo-select-small'
							value={isSubscriptionPurchase}
							label='TransactionType'
							onChange={handleChange}
						>
							<MenuItem value={true}>Subscription Purchase</MenuItem>
							<MenuItem value={false}>One-time Purchase</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</FormControl>
			<center>
				<div className='ag-theme-alpine' style={{
					width: 1005,
					height: 500,
					marginLeft: 20,
				}}>
						<AgGridReact
							rowData={rowData}
							columnDefs={columnDefs}
						/>
				</div>
			</center>
		</>
	);
}
